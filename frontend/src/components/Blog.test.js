import React from 'react';
import { shallow } from 'enzyme';
import Blog from './Blog';

describe('<Blog />', () => {
  let blogComponent;

  beforeEach(() => {
    const blog = {
      author: 'blog author',
      title: 'blog title',
      url: 'blog-address.com',
      likes: 3,
      user: { name: 'Some User' },
    };

    blogComponent = shallow(
      <Blog
        blog={blog}
        handleLike={jest.fn()}
        handleDelete={jest.fn()}
        canBeDeleted={false}
      />,
    );
  });

  it('at start only name and author are displayed', () => {
    const infoDiv = blogComponent.find('.info');
    expect(infoDiv.getElement().props.style).toMatchObject({ display: 'none' });
  });

  it('after clicking name full info is displayed', () => {
    const nameDiv = blogComponent.find('.name');
    nameDiv.simulate('click');

    const infoDiv = blogComponent.find('.info');
    expect(infoDiv.getElement().props.style).toMatchObject({ display: '' });
  });
});
