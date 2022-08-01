import styled from 'styled-components';

// @ts-ignore
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* height: 100%; */
  background-color: #f3f3f3;
  padding-top: 5.5rem;
`;

export const SlideShowContainer = styled.div`
  position: relative;
  height: 16.25rem;
  min-height: 16.25rem;
  width: 100%;
  overflow: hidden;
`;

export const PictureContainer = styled(Slide)`
  display: flex;
  width: 100%;
  height: 16.25rem;
  min-height: 16.25rem;
  z-index: 1;

  .react-slideshow-container {
    width: 100%;
    height: 16.25rem;
  }

  .each-slide {
    div {
      width: 100%;
      height: 16.25rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 16.25rem;
    }
  }
`;

export const Picture = styled.img<{ width: number }>`
  width: ${({ width }) => width}px;
  z-index: 1;
  /* height: 16.25rem; */
`;

export const SlideShow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 0.875rem;
  position: absolute;
  bottom: 0.5rem;
  z-index: 2;
  
  div {
    display: flex;
    align-items: center;

    bottom: 0.5rem;
    align-self: center;
    justify-self: center;
  }
`;

export const SlideshowButton = styled.button<{ active: boolean }>`
  width: 0.875rem;
  height: 0.875rem;
  background-color: ${({ active }) => active ? '#fff' : 'rgba(100, 100, 100, 0.75)'};
  border-radius: 50%;
  
  & + button {
    margin-left: 0.625rem
  } 
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.625rem 1.25rem 7.5rem;
  color: #272E47;
  font-size: 1rem;
  line-height: 1.4375rem;
  align-items: center;
`;

export const Info = styled.a`
  width: 100%;
  border-radius: 0.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-left: 1.25rem;
  height: 5.125rem;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.125rem;
    height: 2.125rem;
    border-radius: 50%;
    margin-right: 0.625rem;
    background-color: #0173B1;
  }
  
  & + div {
    span {
      background-color: #25CFA1;
    }
  }

  color: #272E47;
  font-size: 1rem;
  line-height: 1.4375rem;
  margin-top: 1.25rem;
`;

export const SocialMediaContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2.5rem;
  align-self: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 20px 0 #00000029;
  }
`;