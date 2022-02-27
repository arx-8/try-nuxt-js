// organize-imports-ignore
import { mount, Wrapper } from '@vue/test-utils'
import { getAccessorFromStore } from 'typed-vuex'
import Vuex, { Store } from 'vuex'
import Vue from 'vue'
import TodoApp from './index.vue'
import type { Computed, Data, Methods } from './types'
import type { WrapperVM } from '@/types/vue'
import { store } from '@/store'
import { TodoID } from '@/domain/todo'

describe('todo-app-vuex', () => {
  beforeAll(() => {
    Vue.use(Vuex)
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2021, 0, 1, 1, 1, 1))
  })

  const createWrapper = (): Wrapper<Vue> => {
    const storeForTesting = new Store(store)
    return mount(TodoApp, {
      mocks: {
        $accessor: getAccessorFromStore(storeForTesting)(storeForTesting),
      },
    })
  }

  it('filteredTodoList', () => {
    // ## Arrange ##
    // ## Act ##
    const wrapper = createWrapper()

    // ## Assert ##
    const vm = wrapper.vm as unknown as WrapperVM<Data, Methods, Computed>
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
      ]
    `)
  })

  it('filteredTodoList with filter', () => {
    // ## Arrange ##
    const wrapper = createWrapper()
    const vm = wrapper.vm as unknown as WrapperVM<Data, Methods, Computed>

    // ## Act ##
    vm.onClickFilter('todo')

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
    const wrapper = createWrapper()
    const vm = wrapper.vm as unknown as WrapperVM<Data, Methods, Computed>

    // ## Act ##
    vm.typingTaskName = 'new task'
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
    const wrapper = createWrapper()
    const vm = wrapper.vm as unknown as WrapperVM<Data, Methods, Computed>

    // ## Act ##
    vm.onClickDelete(1 as TodoID)

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
