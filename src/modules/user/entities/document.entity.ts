export class Document {
    public id: string;
    public type: string;

    // Consider how you can block when it comes to a repeated document
    constructor(document: string) {
        if(this.isValid(document))
            this.id = this.cleanDocument(document)
    }

    public isValid(doc: string): boolean | string {
        if (!this.hasValidLength(doc)) {
            console.error('Invalid argument length or document number.');
            return false;
        }

        if (this.hasValidCheckDigits(doc)) {
            return true;
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
            ? this.validatePersonalId(arr)
            : this.validateBusinessId(arr);
    }

    private validatePersonalId(arr: number[]): boolean {
        this.type = 'Personal';
        return (
            this.validateCheckDigit(arr, 9, 10) &&
            this.validateCheckDigit(arr, 10, 11)
        );
    }

    private validateBusinessId(arr: number[]): boolean {
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