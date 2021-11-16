import React, { useEffect } from "react";
import "./styling/Home.css";
import Product from "./Product";

import Aos from "aos";
import "aos/dist/aos.css";

/* Images */
import book_lamp from "./images/book_lamp.jpg";
import indus_lamp from "./images/industrial2_lamp.jpg";
import fancy_lamp from "./images/fancy_floor_lamp3.png";
import modern_lamp from "./images/modern_floor_lamp.jpg";
import mush_lamp from "./images/mushroom_lamp.webp";
import tree_lamp from "./images/tree_lamp.png";
import corner_lamp from "./images/corner_lamp2.jpg";
import stick_lamp from "./images/stick_lamp.jpg";
import wooden_lamp from "./images/wooden_box_lamp.jpg";

function Home() {
  useEffect(() => {
    document.title = "LightHouse. It's Scintillating.";
  }, []);

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <div className="home">
      <div className="home__carousel"></div>
      <div className="home__row">
        <Product
          id={1}
          title="Fancy Twist Floor Lamp"
          price={6500}
          image={fancy_lamp}
          rating={5}
        />

        <Product
          id={2}
          title="Modern Floor Lamp | Metallic Silver"
          price={5500}
          image={modern_lamp}
          rating={5}
        />

        <Product
          id={3}
          title="Mushroom Lamp"
          price={3000}
          image={mush_lamp}
          rating={5}
        />
      </div>
      <div className="home__row" data-aos="fade-up">
        <Product
          id={4}
          title="Pine Tree Lamp LED"
          price={3500}
          image={tree_lamp}
          rating={5}
        />
        <Product
          id={5}
          title="Stick Lamp for Table/Shelves"
          price={3000}
          image={stick_lamp}
          rating={5}
        />
      </div>
      <div className="home__row" data-aos="fade-out-up">
        <Product
          id={6}
          title="Corner Floor Lamp RGB Minimalist"
          price={2500}
          image={corner_lamp}
          rating={5}
        />
      </div>
      <div className="home__row" data-aos="fade-up">
        <Product
          id={7}
          title="LED Industrial Lamp"
          price={2500}
          image={indus_lamp}
          rating={5}
        />
        <Product
          id={8}
          title="Wooden Box Lamp"
          price={2000}
          image={wooden_lamp}
          rating={5}
        />
        <Product
          id={9}
          title="Book Lamp | Aesthetic"
          price={2500}
          image={book_lamp}
          rating={5}
        />
      </div>
    </div>
  );
}

export default Home;
