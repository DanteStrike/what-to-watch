import {createValidationReport, checkEmail, checkPassword} from "./validation";


describe(`Util Validation should work correctly`, () => {
  const successReport = {
    isValid: true,
    msg: ``
  };

  it(`Util createValidationReport`, () => {
    expect(createValidationReport(true, `any`)).toEqual({
      isValid: true,
      msg: `any`
    });
  });

  it(`Util checkEmail`, () => {
    const emptyEmailReport = {
      isValid: false,
      msg: `Form: Please enter email address`
    };
    const invalidEmailReport = {
      isValid: false,
      msg: `Form: Please enter a valid email address`
    };

    expect(checkEmail(``)).toEqual(emptyEmailReport);

    expect(checkEmail(`test.test.com`)).toEqual(invalidEmailReport);
    expect(checkEmail(`test@.test.test`)).toEqual(invalidEmailReport);
    expect(checkEmail(`@test.test.test`)).toEqual(invalidEmailReport);
    expect(checkEmail(`test@test.test`)).toEqual(invalidEmailReport);
    expect(checkEmail(`test@.test.test`)).toEqual(invalidEmailReport);
    expect(checkEmail(`.test@test.test`)).toEqual(invalidEmailReport);
    expect(checkEmail(`test()*@test.test`)).toEqual(invalidEmailReport);
    expect(checkEmail(`test..1234@test.test`)).toEqual(invalidEmailReport);
    expect(checkEmail(`true@true`)).toEqual(invalidEmailReport);
    expect(checkEmail(`true@true.test`)).toEqual(invalidEmailReport);

    expect(checkEmail(`true@true.123`)).toEqual(successReport);
    expect(checkEmail(`true@true.12`)).toEqual(successReport);
    expect(checkEmail(`true___111@true.12`)).toEqual(successReport);
  });

  it(`Util checkPassword`, () => {
    expect(checkPassword(``)).toEqual({
      isValid: false,
      msg: `Form: Please enter password`
    });
    expect(checkPassword(`a`)).toEqual(successReport);
  });
});
