import { DocumentValidator } from '../../../modules/user/utils/document-validator';

describe('Document Validator', () => {
    const validator = new DocumentValidator();

    it('should return a valid CPF', () => {
        const validCpf = '12345678909';

        expect(validator.isValid(validCpf)).toBe(validCpf);
    });

    it('should throw an error for an invalid CPF', () => {
        const invalidCpf = '12345678900';
        expect(() => validator.isValid(invalidCpf)).toThrowError('Invalid document number.');
    });

    it('should return a valid CNPJ', () => {
        const validCnpj = '12345678000195';
        expect(validator.isValid(validCnpj)).toBe(validCnpj);
    });

    it('should throw an error for an invalid CNPJ', () => {
        const invalidCnpj = '13878352000096';
        expect(() => validator.isValid(invalidCnpj)).toThrowError('Invalid document number.');
    });
});
