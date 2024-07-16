export class Document {
    public id: string | boolean;
    public type: string | undefined;

    // Consider how you can block when it comes to a repeated document
    constructor(document: string) {
        const doc = this.cleanDocument(document);
        this.id = this.isValid(doc);
    }

    public isValid(doc: string): boolean | string {
        if (!this.hasValidLength(doc)) {
            console.error('Invalid argument length or document number.');
            return false;
        }

        if (this.hasValidCheckDigits(doc)) {
            return doc;
        }

        console.error('Invalid document number.');
        return false;
    }

    private cleanDocument(id: string): string {
        return id.replace(/[^\d]+/g, '');
    }

    private hasValidLength(doc: string): boolean {
        return doc.length === 11 || doc.length === 14;
    }

    private hasValidCheckDigits(doc: string): boolean {
        const arr = doc.split('').map(Number);
        return doc.length === 11
            ? this.validateCPF(arr)
            : this.validateCNPJ(arr);
    }

    private validateCPF(arr: number[]): boolean {
        this.type = 'Personal';
        return (
            this.validateCheckDigit(arr, 9, 10) &&
            this.validateCheckDigit(arr, 10, 11)
        );
    }

    private validateCNPJ(arr: number[]): boolean {
        this.type = 'Business';
        return (
            this.validateCheckDigit(arr, 12, 5, 2) &&
            this.validateCheckDigit(arr, 13, 6, 2)
        );
    }

    private validateCheckDigit(
        arr: number[],
        checkDigitIndex: number,
        startWeight: number,
        restLimit: number = 10,
    ): boolean {
        let sum = 0;
        let weight = startWeight;

        for (let i = 0; i < checkDigitIndex; i++) {
            sum += arr[i] * weight;
            weight = weight === 2 ? 9 : weight - 1;
        }

        const rest = (sum * 10) % 11;
        const checkDigit = rest >= restLimit ? 0 : rest;
        return checkDigit === arr[checkDigitIndex];
    }
}
