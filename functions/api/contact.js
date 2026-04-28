// POST /api/contact — receives inquiry form, stores in D1, emails notification via Resend.
//
// Bindings expected (configured in Cloudflare Pages dashboard or wrangler.toml):
//   env.DB                  — D1 database, table `contacts`
//   env.RESEND_API_KEY      — Resend API key
//   env.NOTIFICATION_EMAIL  — recipient for inquiry alerts (e.g. jay73hun@gmail.com)
//   env.FROM_EMAIL          — sender, e.g. "WIBE <onboarding@resend.dev>" until domain verified

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const escape = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const onRequestPost = async ({ request, env }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: '잘못된 요청 형식입니다.' }, 400);
  }

  const { company, name, phone, email, country, product, message, consent } = body || {};

  if (!company || !name || !email) {
    return json({ error: '회사명, 담당자명, 이메일은 필수입니다.' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: '이메일 형식이 올바르지 않습니다.' }, 400);
  }
  if (consent !== true) {
    return json({ error: '개인정보 수집·이용에 동의해주세요.' }, 400);
  }
  if (String(message || '').length > 5000) {
    return json({ error: '메시지가 너무 깁니다.' }, 400);
  }

  const consentAt = new Date().toISOString();

  // 1. Persist to D1 first — data integrity is the priority.
  try {
    await env.DB.prepare(
      `INSERT INTO contacts (company, name, phone, email, country, product, message, consent_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      company, name, phone || '', email, country || '', product || '', message || '', consentAt
    ).run();
  } catch (err) {
    console.error('D1 insert failed:', err);
    return json({ error: '저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }, 500);
  }

  // 2. Send notification email via Resend (best-effort — DB already has the record).
  if (env.RESEND_API_KEY && env.NOTIFICATION_EMAIL) {
    const subject = `[WIBE 문의] ${company} — ${name}`;
    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111">
        <h2 style="margin:0 0 16px;color:#ee9144">새 문의가 접수되었습니다</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#666;width:120px">회사명</td><td style="padding:8px 0"><b>${escape(company)}</b></td></tr>
          <tr><td style="padding:8px 0;color:#666">담당자</td><td style="padding:8px 0">${escape(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#666">이메일</td><td style="padding:8px 0"><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#666">연락처</td><td style="padding:8px 0">${escape(phone) || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#666">진출 희망 국가</td><td style="padding:8px 0">${escape(country) || '—'}</td></tr>
        </table>
        <h3 style="margin:24px 0 8px;font-size:14px;color:#666;text-transform:uppercase;letter-spacing:1px">제품/서비스</h3>
        <div style="padding:12px;background:#f7f7f7;border-radius:6px;white-space:pre-wrap;font-size:14px">${escape(product) || '—'}</div>
        <h3 style="margin:24px 0 8px;font-size:14px;color:#666;text-transform:uppercase;letter-spacing:1px">요청 사항</h3>
        <div style="padding:12px;background:#f7f7f7;border-radius:6px;white-space:pre-wrap;font-size:14px">${escape(message) || '—'}</div>
        <p style="margin-top:24px;font-size:12px;color:#999">접수 시각: ${new Date().toISOString()}</p>
      </div>
    `;

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: env.FROM_EMAIL || 'WIBE <onboarding@resend.dev>',
          to: [env.NOTIFICATION_EMAIL],
          reply_to: email,
          subject,
          html,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        console.error('Resend failed:', res.status, errText);
      }
    } catch (err) {
      console.error('Resend exception:', err);
    }
  } else {
    console.warn('RESEND_API_KEY or NOTIFICATION_EMAIL not set — skipping email');
  }

  return json({ ok: true });
};
