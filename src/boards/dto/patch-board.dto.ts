import { BoardStatus } from '../board-status.enum'

export class PatchBoardDto {
  id: number
  status: BoardStatus
}
