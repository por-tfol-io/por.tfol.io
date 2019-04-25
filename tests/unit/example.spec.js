import { shallowMount } from '@vue/test-utils';
import Contact from '@/views/Contact.vue';

describe('Contact.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Contact, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
