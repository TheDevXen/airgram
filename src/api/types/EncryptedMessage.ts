import { EncryptedFileUnion } from './EncryptedFile'

export interface EncryptedMessage {
  _: 'encryptedMessage'
  random_id: number
  chat_id: number
  date: number
  bytes: number[]
  file: EncryptedFileUnion
}

export interface EncryptedMessageService {
  _: 'encryptedMessageService'
  random_id: number
  chat_id: number
  date: number
  bytes: number[]
}

export type EncryptedMessageUnion = EncryptedMessage
  | EncryptedMessageService
