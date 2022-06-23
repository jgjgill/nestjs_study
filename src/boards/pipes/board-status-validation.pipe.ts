import { BadRequestException, PipeTransform } from '@nestjs/common'
import { BoardStatus } from '../board-status.enum'

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC]

  transform(value: any) {
    const upperValue = value.status.toUpperCase()

    if (!this.isStatusValid(upperValue)) {
      throw new BadRequestException(`${upperValue} isn't in the status`)
    }

    return { id: value.id, status: upperValue }
  }

  private isStatusValid(status: any) {
    return this.StatusOptions.includes(status)
  }
}
