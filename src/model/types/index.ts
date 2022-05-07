import {
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional
} from 'sequelize'

export interface DBModel {
  sequelize?: Sequelize
  user?: typeof User
  question?: typeof Question
  answer?: typeof Answer
  comment?: typeof Comment
  gameQuestion?: typeof GameQuestion
  knowledgeGame?: typeof KnowLedgeGame
  knowledgeGame_gameQuestion?: typeof KnowledgeGame_GameQuestion
  exchangeItem?: typeof ExchangeItem
  exchangeItem_user?: typeof ExchangeItem_User
  consultant?: typeof Consultant
  article?: typeof Article
}

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>
  declare username: string
  declare password: string
  declare phone: number
  declare avatar: CreationOptional<string>
  declare isAdmin: CreationOptional<boolean>
  declare isDoctor: CreationOptional<boolean>
  declare isPatient: CreationOptional<boolean>
  declare points: CreationOptional<number>
}

export class Question extends Model<
  InferAttributes<Question>,
  InferCreationAttributes<Question>
> {
  declare id: CreationOptional<number>
  declare title: string
  declare desc: string
  declare userId: number
}

export class Answer extends Model<
  InferAttributes<Answer>,
  InferCreationAttributes<Answer>
> {
  declare id: CreationOptional<number>
  declare title: string
  declare content: string
  declare agree: CreationOptional<number>
  declare disAgree: CreationOptional<number>
  declare userId: number
  declare questionId: number
}

export class Comment extends Model<
  InferAttributes<Comment>,
  InferCreationAttributes<Comment>
> {
  declare id: CreationOptional<number>
  declare content: string
  declare userId: number
  declare answerId: number
}

export class GameQuestion extends Model<
  InferAttributes<GameQuestion>,
  InferCreationAttributes<GameQuestion>
> {
  declare id: CreationOptional<number>
  declare question: string
  declare answerA: string
  declare answerB: string
  declare answerC: string
  declare answerD: string
  declare rightAnswer: string
}

export class KnowLedgeGame extends Model<
  InferAttributes<KnowLedgeGame>,
  InferCreationAttributes<KnowLedgeGame>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare questionNum: number
  declare personNum: number
  declare finishNum: CreationOptional<number>
  declare correct: CreationOptional<number>
  declare wrong: CreationOptional<number>
}

export class KnowledgeGame_GameQuestion extends Model<
  InferAttributes<KnowledgeGame_GameQuestion>,
  InferCreationAttributes<KnowledgeGame_GameQuestion>
> {
  declare id: CreationOptional<number>
  declare knowledgeGameId: number
  declare gameQuestionId: number
}

export class ExchangeItem extends Model<
  InferAttributes<ExchangeItem>,
  InferCreationAttributes<ExchangeItem>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare img: string
  declare count: number
  declare points: number
}

export class ExchangeItem_User extends Model<
  InferAttributes<ExchangeItem_User>,
  InferCreationAttributes<ExchangeItem_User>
> {
  declare id: CreationOptional<number>
  declare userId: number
  declare exchangeItemId: number
  declare address: string
  declare phone: number
  declare addressee: string
}

export class Consultant extends Model<
  InferAttributes<Consultant>,
  InferCreationAttributes<Consultant>
> {
  declare id: CreationOptional<number>
  declare age: number
  declare sex: number
  declare symptom: string
  declare cQuestion: string
  declare cAnswer: string
  declare haveReplies: CreationOptional<boolean>
  declare userId: number
}

export class Article extends Model<
  InferAttributes<Article>,
  InferCreationAttributes<Article>
> {
  declare id: CreationOptional<number>
  declare title: string
  declare cover: string
  declare content: string
  declare type: number
}
