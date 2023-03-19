import { Skeleton } from "@mui/material";
import poster from "../../resources/img/poster.jpg";

export const SkeletonFilms = () => (
  <div className="film-list__grid">
    {Array.from({ length: 6 }).map((_, index) => (
      <li key={index} className="film" style={{ minWidth: "100%" }}>
        <div className="film__poster-link">
          <Skeleton
            sx={{
              backgroundColor: "rgb(255 255 255 / 20%)",
              borderRadius: "12px",
              minWidth: "400px",
            }}
            variant="rectangular"
          >
            <img className="film__poster" src={poster} alt="Обложка" />
          </Skeleton>
        </div>
        <Skeleton
          sx={{
            backgroundColor: "rgb(255 255 255 / 20%)",
            borderRadius: "12px",
            minWidth: "40%",
          }}
        >
          <div className="film__title-link">
            <h2 className="film__title">Title</h2>
          </div>
        </Skeleton>
        <Skeleton
          sx={{
            backgroundColor: "rgb(255 255 255 / 20%)",
            borderRadius: "12px",
            minWidth: "80%",
          }}
        >
          <div className="film__descr">Desription</div>
        </Skeleton>
      </li>
    ))}
  </div>
);
