// organize-imports-ignore
import { mount } from '@vue/test-utils'
import TodoApp from './index.vue'
import { FixMeAny } from '@/types/utils'

describe('todo-app', () => {
  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2021, 0, 1, 1, 1, 1))
  })

  it('filteredTodoList', () => {
    // ## Arrange ##
    // ## Act ##
    const wrapper = mount(TodoApp)

    // ## Assert ##
    expect((wrapper.vm as FixMeAny).filteredTodoList).toMatchInlineSnapshot(`
      Array [
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
      ]
    `)
  })

  it('filteredTodoList with filter', () => {
    // ## Arrange ##
    const wrapper = mount(TodoApp)
    const vm = wrapper.vm as FixMeAny

    // ## Act ##
    vm.filter = 'todo'

    // ## Assert ##
    expect(vm.filteredTodoList).toMatchInlineSnapshot(`
      Array [
        Object {
          "done": false,
          "id": 1,
          "taskName": "the one",
        },
      ]
    `)
  })

  it('onAddTodo', () => {
    // ## Arrange ##
    const wrapper = mount(TodoApp)
    const vm = wrapper.vm as FixMeAny

    // ## Act ##
    vm.taskName = 'new task'
    vm.onAddTodo(
      new KeyboardEvent('keydown', {
        keyCode: 13,
      })
    )

    // ## Assert ##
    expect(vm.filteredTodoList).toMatchInlineSnapshot(`
      Array [
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
          "id": 1609430461000,
          "taskName": "new task",
        },
      ]
    `)
  })

  it('onClickDelete', () => {
    // ## Arrange ##
    const wrapper = mount(TodoApp)
    const vm = wrapper.vm as FixMeAny

    // ## Act ##
    vm.onClickDelete(0)

    // ## Assert ##
    expect(vm.filteredTodoList).toMatchInlineSnapshot(`
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
