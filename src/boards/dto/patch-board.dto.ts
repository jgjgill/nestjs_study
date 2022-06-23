import { BoardStatus } from '../boards-status.enum'

export class PatchBoardDto {
  id: number
  status: BoardStatus
}
