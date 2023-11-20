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
  } catch (e) {
    return true;
  }

  return false;
}
