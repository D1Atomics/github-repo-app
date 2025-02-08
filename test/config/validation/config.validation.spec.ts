import { validationSchema } from '../../../config/validation/config.validation';

describe('Configuration Validation', () => {
  it('should validate a correct configuration', () => {
    const validConfig = {
      GITHUB_API_URL: 'https://api.github.com',
    };
    const { error } = validationSchema.validate(validConfig);
    expect(error).toBeUndefined();
  });

  it('should reject an invalid configuration (missing GITHUB_API_URL)', () => {
    const invalidConfig = {};
    const { error } = validationSchema.validate(invalidConfig);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toContain('"GITHUB_API_URL" is required');
  });

  it('should reject an invalid configuration (invalid URL)', () => {
    const invalidConfig = {
      GITHUB_API_URL: 'invalid-url',
    };
    const { error } = validationSchema.validate(invalidConfig);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toContain(
      '"GITHUB_API_URL" must be a valid uri',
    );
  });
});
