import { Extension } from '@tiptap/core'
import { describe, expect, it } from 'vitest'
import extension from './extension'

describe('Extension config', () => {
  it('should spit extension', () => {
    expect(extension).toBeInstanceOf(Extension)
  })
})
