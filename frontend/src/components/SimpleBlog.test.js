import React from 'react';
import { shallow } from 'enzyme';
import SimpleBlog from './SimpleBlog';

describe('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      likes: 10,
    };

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />);

    const infoDiv = simpleBlogComponent.find('.info');
    expect(infoDiv.text()).toContain(blog.title);
    expect(infoDiv.text()).toContain(blog.author);

    const likesDiv = simpleBlogComponent.find('.likes');
    expect(likesDiv.text()).toContain(`${blog.likes} likes`);
  });

  it('clicking the "like" button twice calls event handler twice', () => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      likes: 10,
    };

    const mockHandler = jest.fn();

    const simpleBlogComponent = shallow(
      <SimpleBlog blog={blog} onClick={mockHandler} />,
    );

    const button = simpleBlogComponent.find('button');

    button.simulate('click');
    expect(mockHandler.mock.calls.length).toBe(1);
    button.simulate('click');
    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
