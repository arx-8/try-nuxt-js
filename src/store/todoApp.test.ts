// organize-imports-ignore
// import { getters, State, mutations } from './todoApp'
import type { State } from './todoApp'
import * as todoApp from './todoApp'
import type { TodoID } from '@/domain/todo'
import * as todo from '@/domain/todo'

const createStateBase = (overwrite?: Partial<State>): State => {
  return {
    filter: 'all',
    todoList: [
      {
        done: false,
        id: 1 as TodoID,
        taskName: 'the one',
      },
      {
        done: true,
        id: 2 as TodoID,
        taskName: 'go out',
      },
      {
        done: false,
        id: 3 as TodoID,
        taskName: 'three',
      },
    ],
    typingTaskName: '',
    ...overwrite,
  }
}

describe('todoApp', () => {
  let sut: typeof todoApp

  /**
   * @see https://facebook.github.io/jest/docs/en/mock-functions.html#mock-return-values
   */
  beforeAll(() => {
    // ## Arrange ##
    jest.mock('./../domain/todo')

    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-member-access */
    const mockTodo: jest.Mocked<typeof todo> = require('./../domain/todo')
    mockTodo.generateTodoID.mockReturnValue(123 as TodoID)

    sut = require('./todoApp')
    /* eslint-enable */
  })

  describe('getters.filteredTodoList', () => {
    it('when done', () => {
      // ## Arrange ##
      const state = createStateBase({
        filter: 'done',
      })

      // ## Act ##
      const result = sut.getters.filteredTodoList(state)

      // ## Assert ##
      expect(result).toMatchInlineSnapshot(`
        Array [
          Object {
            "done": true,
            "id": 2,
            "taskName": "go out",
          },
        ]
      `)
    })
  })

  describe('mutations.addTodo', () => {
    it('ok', () => {
      // ## Arrange ##
      const state = createStateBase({
        typingTaskName: 'new task',
      })

      // ## Act ##
      sut.mutations.addTodo(state)

      // ## Assert ##
      expect(state).toMatchInlineSnapshot(`
        Object {
          "filter": "all",
          "todoList": Array [
            Object {
              "done": false,
              "id": 1,
              "taskName": "the one",
            },
            Object {
              "done": true,
              "id": 2,
              "taskName": "go out",
            },
            Object {
              "done": false,
              "id": 3,
              "taskName": "three",
            },
            Object {
              "done": false,
              "id": 123,
              "taskName": "new task",
            },
          ],
          "typingTaskName": "",
        }
      `)
    })
  })

  describe('mutations.deleteTodo', () => {
    it('ok', () => {
      // ## Arrange ##
      const state = createStateBase()

      // ## Act ##
      sut.mutations.deleteTodo(state, 2 as TodoID)

      // ## Assert ##
      expect(state).toMatchInlineSnapshot(`
        Object {
          "filter": "all",
          "todoList": Array [
            Object {
              "done": false,
              "id": 1,
              "taskName": "the one",
            },
            Object {
              "done": false,
              "id": 3,
              "taskName": "three",
            },
          ],
          "typingTaskName": "",
        }
      `)
    })
  })

  describe('mutations.setFilter', () => {
    it('ok', () => {
      // ## Arrange ##
      const state = createStateBase()

      // ## Act ##
      sut.mutations.setFilter(state, 'todo')

      // ## Assert ##
      expect(state).toMatchInlineSnapshot(`
        Object {
          "filter": "todo",
          "todoList": Array [
            Object {
              "done": false,
              "id": 1,
              "taskName": "the one",
            },
            Object {
              "done": true,
              "id": 2,
              "taskName": "go out",
            },
            Object {
              "done": false,
              "id": 3,
              "taskName": "three",
            },
          ],
          "typingTaskName": "",
        }
      `)
    })
  })

  describe('mutations.setTypingTaskName', () => {
    it('ok', () => {
      // ## Arrange ##
      const state = createStateBase()

      // ## Act ##
      sut.mutations.setTypingTaskName(state, 'typing now')

      // ## Assert ##
      expect(state).toMatchInlineSnapshot(`
        Object {
          "filter": "all",
          "todoList": Array [
            Object {
              "done": false,
              "id": 1,
              "taskName": "the one",
            },
            Object {
              "done": true,
              "id": 2,
              "taskName": "go out",
            },
            Object {
              "done": false,
              "id": 3,
              "taskName": "three",
            },
          ],
          "typingTaskName": "typing now",
        }
      `)
    })
  })

  describe('mutations.toggleTodo', () => {
    it('ok', () => {
      // ## Arrange ##
      const state = createStateBase()

      // ## Act ##
      sut.mutations.toggleTodo(state, 2 as TodoID)

      // ## Assert ##
      expect(state).toMatchInlineSnapshot(`
        Object {
          "filter": "all",
          "todoList": Array [
            Object {
              "done": false,
              "id": 1,
              "taskName": "the one",
            },
            Object {
              "done": false,
              "id": 2,
              "taskName": "go out",
            },
            Object {
              "done": false,
              "id": 3,
              "taskName": "three",
            },
          ],
          "typingTaskName": "",
        }
      `)
    })
  })
})
