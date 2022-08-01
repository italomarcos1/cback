const nameValidation = new RegExp(/^(?=\w+).*$/);

export const isNotEmpty = (name: string) => nameValidation.test(name);

