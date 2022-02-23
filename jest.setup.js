// @ts-check
import { config, RouterLinkStub } from '@vue/test-utils'

// Mock components
config.stubs['nuxt-link'] = RouterLinkStub
config.stubs.AtomsBackIcon = { template: '<span></span>' }
