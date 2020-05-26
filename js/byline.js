const BYLINE_OPTIONS = [
    "senior frontend engineer",
    "freelance graphic designer",
    "aspiring installation artist",
    "web accessibility advocate",
    "user experience nerd",
    "creative coder",
    "amateur cosplayer",
    "animation enthusiast",
    "energetic aikidoka",
    "video & board game geek",
    "funky saxophonista",
  ];
  
  let currentBylineIndex = 0
  let byline = BYLINE_OPTIONS[currentBylineIndex];

  let timeout

  function changeByline() {
    const alphabet = "abcdefghijklmnopqrstuvwxyzαβΓΔδεζηθικΛλμνΞξΠπρΣσςτυΦφχΨψΩω";
    let newBylineIndex = getRandomIndex(BYLINE_OPTIONS.length);
  
    while (newBylineIndex === currentBylineIndex) {
      newBylineIndex = getRandomIndex(BYLINE_OPTIONS.length);
    }
  
    bylineIndex = newBylineIndex
  
    const newByline = BYLINE_OPTIONS[newBylineIndex];
    const newBylineArray = newByline.split("");
    const bylineArray = byline.split("");
  
  
    if (newBylineArray.length > bylineArray.length) {
      let numNewItems = newBylineArray.length - bylineArray.length;
      while (numNewItems > 0) {
        bylineArray.push("");
        numNewItems--;
  
        if (numNewItems > 0) {
          bylineArray.unshift("");
          numNewItems--;
        }
      }
    }
  
    const length = bylineArray.length;
    const midpoint = Math.floor(length / 2);
  
  
    byline = newByline;
    const getRandomLetter = () => alphabet[getRandomIndex(alphabet.length)];
  
    const scrambleIndex = (index, times) => {
      setTimeout(() => {
        if (times < 5) {
          bylineArray[index] =
            newBylineArray[index] !== " " ? getRandomLetter() : " ";
          Vue.set(splash, "byline", bylineArray.join(""));
          scrambleIndex(index, ++times);
        } else {
          bylineArray[index] = newBylineArray[index];
          Vue.set(splash, "byline", bylineArray.join(""));
        }
      }, 80);
    };
    const clearIndex = (index) => {
      bylineArray[index] = "";
      Vue.set(splash, "byline", bylineArray.join(""));
    };
  
  //   const scrambleLetters = (index, direction) => {
  //     const nextIndex = index + direction;
  
  //     setTimeout(() => {
  //       if (index < 0 || index > length) {
  //         clearIndex(index);
  //       } else {
  //         scrambleIndex(index, 0);
  //         scrambleLetters(nextIndex, direction);
  //       }
  //     }, 200);
  //   };
  
  //   scrambleLetters(midpoint, 1)
  //   scrambleLetters(midpoint, -1)
  
    // HERE
  
    const indexArray = bylineArray.map((_, i) => i)
  
    const scrambleRandomLetters = (index, indices) => {
      setTimeout(() => {
          const indicesLeft = indices.length
          const i = getRandomIndex(indicesLeft)
  
          if (indices.length > 0) {
              scrambleIndex(indices[i], 0);
              indices.splice(i, 1)
              scrambleRandomLetters(index, indices);
          } else {
              clearTimeout(timeout)
              timeout = setTimeout(changeByline, 1800)
          }
        }, 400);
    }
    
    scrambleRandomLetters(getRandomIndex(length), indexArray)
    scrambleRandomLetters(getRandomIndex(length), indexArray)
    scrambleRandomLetters(getRandomIndex(length), indexArray)
  
  // END HERE
  
  }
  
  setTimeout(changeByline, 2800);
    