import InvalidUpdatedAtDateError from "../errors/invalid-updated-at-date.error";

export class UpdatedAt {
    private value: Date;
  
    private constructor(date: Date) {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new InvalidUpdatedAtDateError(date);
      }
      this.value = new Date(date);
    }
  
    static now(): UpdatedAt {
      return new UpdatedAt(new Date());
    }
  
    static from(date: Date): UpdatedAt {
      return new UpdatedAt(date);
    }
  
    refresh(): void {
      this.value = new Date();
    }
  
    toDate(): Date {
      return new Date(this.value);
    }
  
    toISOString(): string {
      return this.value.toISOString();
    }
  
    equals(other: UpdatedAt): boolean {
      return this.value.getTime() === other.value.getTime();
    }
  }
  