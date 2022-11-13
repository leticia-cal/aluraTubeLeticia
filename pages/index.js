import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {

  const [valorDoFiltro, setValorDoFiltro] = React.useState("");

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        // backgroundColor: "red",
      }}>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
          Conteúdo
        </Timeline>
        <Youtubers favoritos={config.aluratubers} />
      </div>
    </>
  );
}

export default HomePage

const StyledHeader = styled.div`
    background-color: ${({theme}) => theme.backgroundLevel1};
    .user-info > img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    .user-info{
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 32px;
      gap: 16px;
    }

  `;

const StyledBanner = styled.div`
  background-color: blue;
  height: 230px;
  background-image: url(${({ bg }) => bg});
  /*background-image: url(${config.urlbanne});*/
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.urlbanner} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({ searchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists);
  return (
    <StyledTimeline>
      {playlistNames.map(function (playlistName) {
        const videos = props.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.
                filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized);
                }).
                map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>
                        {video.title}
                      </span>
                    </a>
                  )
                })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}

const StyledAluraTubers = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  overflow: hidden;
  img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    
  }
  h2{
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  section {
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding: 16px;
    div {
      text-align: center;
      width: calc(100vw - 16px * 4);
      display: grid;
      grid-gap: 8px;
      grid-template-columns: repeat(auto-fill,100px);
      grid-auto-flow: column;
      grid-auto-columns: 100px;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      a {
        scroll-snap-align: start;
        span {
          padding-top: 8px;
          display: block;
          color: ${({ theme }) => theme.textColorBase || "#222222"};
          font-size: 14px;
        }
      }
    }
  }
`;

function Youtubers(propriedades) {
  const lista = Object.values(propriedades);
  return (
    <StyledAluraTubers>
      {lista.map(function (nomes) {
        return (
          <section key={nomes}>
            <h2>AluraTubes Favoritos</h2>
            <div>
              {nomes.map((nome) => {
                return (
                  <a key={nome} href={`https://github.com/${nome}`}>
                    <img src={`https://github.com/${nome}.png`} />
                    <span>{`@${nome}`}</span>
                  </a>
                )
              })}
            </div>
          </section>
        )
      })}
    </StyledAluraTubers>
  )
}