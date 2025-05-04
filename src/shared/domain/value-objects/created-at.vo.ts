import InvalidCreatedAtDateError from "../errors/invalid-created-at-date.error";

export class CreatedAt {
    private readonly value: Date;
  
    private constructor(date: Date) {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new InvalidCreatedAtDateError(date);
      }
      this.value = new Date(date); 
    }
  
    static now(): CreatedAt {
      return new CreatedAt(new Date());
    }
  
    static from(date: Date): CreatedAt {
      return new CreatedAt(date);
    }
  
    toDate(): Date {
      return new Date(this.value);
    }
  
    toISOString(): string {
      return this.value.toISOString();
    }
  
    equals(other: CreatedAt): boolean {
      return this.value.getTime() === other.value.getTime();
    }
  }
  