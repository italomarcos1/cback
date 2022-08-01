import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchClient } from '../../app/requests/general';
import "react-slideshow-image/dist/styles.css";

// @ts-ignore
import { ReactComponent as ReserveIcon } from '../../assets/reserve.svg';
// @ts-ignore
import { ReactComponent as MapIcon } from '../../assets/pin.svg';
// @ts-ignore
import { ReactComponent as PhoneIcon } from '../../assets/celular-ico.svg';
// @ts-ignore
import { ReactComponent as FacebookIcon } from '../../assets/facebook-ico.svg';
// @ts-ignore
import { ReactComponent as InstagramIcon } from '../../assets/instagram-ico.svg';
// @ts-ignore
import { ReactComponent as YoutubeIcon } from '../../assets/youtube-ico.svg';
// @ts-ignore
import { ReactComponent as TwitterIcon } from '../../assets/twitter-ico.svg';
// @ts-ignore
import { ReactComponent as WhatsappIcon } from '../../assets/whatsapp-ico.svg';

import { Header } from '../../components/Header';
import { ReservationButton, ReservationButtonText } from '../Menu/styles';

import { Container, Description, Info, Picture, PictureContainer, SlideShow, SlideshowButton, SlideShowContainer, SocialMediaContainer } from './styles';

export function About() {
  const { data: client } =
    useQuery('client', fetchClient, { staleTime: 1000 * 60 * 10 });

  const slideRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState('1');
console.log(client)
  return (
    <>
      <Header title={!!client ? client.name : 'CBACK'} style={{ zIndex: 999 }}/>
      {!!client &&
        <Container>
          <SlideShowContainer>
            <PictureContainer
              arrows={false}
              ref={slideRef}
              duration={1000}
              // @ts-ignore
              onChange={(e) => {
                setCurrentSlide(String(e));
                console.log(e)
              }}
            >
              {client.gallery.map((g) => 
                <div className="each-slide">
                  <div
                    style={{
                      backgroundImage: `url(${g.image.JPG})`,
                    }}
                  />
                </div>
              )}
            </PictureContainer>
            <SlideShow>
              <div>
                {client.gallery.map((c, index) =>
                  <SlideshowButton
                    key={c.id}
                    active={currentSlide === String(index)}
                    // @ts-ignore
                    onClick={() => {}}
                  />
                )}
              </div>
            </SlideShow>
          </SlideShowContainer>
          <Description>
            {client.about}
            <Info
              href={client.maps_url}
            >
              <span>
                <MapIcon />
              </span>
              {client.address}, 2<br/>
              {client.city}, Portugal {client.zipcode}
            </Info>
            <Info
              href={`tel:351${client.phone}`}
              style={{
                height: '3.625rem',
              }}
            >
              <span
                style={{
                  backgroundColor: '#25CFA1'
                }}
              >
                <PhoneIcon />
              </span>
              +351 {client.phone}
            </Info>
            <ReservationButton
              href={client.book_url}
              style={{ marginTop: '1.25rem' }}
            >
              <ReserveIcon />
              <ReservationButtonText>
                Reservar
              </ReservationButtonText>
            </ReservationButton>
            <SocialMediaContainer>
              <a
                href={client.facebook_url}
              >
                <FacebookIcon />
              </a>
              <a
                href={client.instagram_url}
              >
                <InstagramIcon />
              </a>
              <a
                href={client.youtube_url}
              >
                <YoutubeIcon />
              </a>
              <a
                href={client.twitter_url ?? '/about'}
              >
                <TwitterIcon />
              </a>
              <a
                href={client.book_whatsapp ?? '/about'}
              >
                <WhatsappIcon />
              </a>
            </SocialMediaContainer>
          </Description>
        </Container>
      }
    </>
  );
}
