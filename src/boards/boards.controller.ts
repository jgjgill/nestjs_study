import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/auth/get-user.decorator'
import { User } from 'src/auth/user.entity'
import { Board } from './board.entity'
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { PatchBoardDto } from './dto/patch-board.dto'
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe'

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController')
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards()
  }

  @Get('me')
  getMyBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get boards`)
    return this.boardsService.getMyBoards(user)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User ${user.username} creating a new board - Payload: ${JSON.stringify(
        createBoardDto,
      )}`,
    )
    return this.boardsService.createBoard(createBoardDto, user)
  }

  @Get(':id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id)
  }

  @Delete(':id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user)
  }

  @Patch(':id/:status')
  @UsePipes(BoardStatusValidationPipe)
  updateBoardStatus(@Param() patchBoardDto: PatchBoardDto): Promise<Board> {
    return this.boardsService.updateBoardStatus(patchBoardDto)
  }
}
