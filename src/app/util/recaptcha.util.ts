export async function hasInvalidGoogleRecaptcha(
  captchaToken: string,
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
      { method: 'POST' },
    );

    if (response.status !== 200) {
      return true;
    }
    const data = await response.json();
    console.log(data);

    if (data.success === false) {
      return true;
    }

    return data.score <= 0.5;
  } catch (e) {
    return true;
  }
}
