export interface EmailPayload {
  authToken: string;
  fromAddress: string;
  toAddress: string;
  ccAddress?: string;
  subject: string;
  content: string;
}

export async function getToken(): Promise<string> {
  const queryParams = {
    refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
    grant_type: 'refresh_token',
    client_id: process.env.ZOHO_CLIENT_ID!,
    client_secret: process.env.ZOHO_CLIENT_SECRET!,
    redirect_uri: 'https://remotejobsgreece.gr',
    scope: 'ZohoMail.accounts.READ,ZohoMail.messages.CREATE',
  };

  const queryString = new URLSearchParams({ ...queryParams }).toString();

  try {
    const response = await fetch(
      `https://accounts.zoho.eu/oauth/v2/token?${queryString}`,
      { headers: { 'Content-Type': 'application/json' }, method: 'POST' },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      throw new Error('could not retrieve zoho token');
    }

    return data.access_token;
  } catch (err) {
    throw err;
  }
}

export async function sendEmail(payload: EmailPayload) {
  const { fromAddress, toAddress, ccAddress, subject, content } = payload;

  const response = await fetch(
    `https://mail.zoho.eu/api/accounts/${process.env.ZOHO_ACCOUNT_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${payload.authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fromAddress,
        toAddress,
        ccAddress,
        subject,
        content,
      }),
    },
  );

  if (!response.ok) {
    console.error(await response.json());
    throw new Error('could not send email');
  }

  return await response.json();
}
