export type SlideLayout = {
  imgWidth: string;
  imgHeight: string;
  imgLeft: string;
  imgTop: string;
  textSide: "overlay-left" | "overlay-bottom" | "right";
};

export const LAYOUTS: SlideLayout[] = [
  { imgWidth: "60vw", imgHeight: "80vh", imgLeft: "8vw",  imgTop: "10vh", textSide: "right" },
  { imgWidth: "75vw", imgHeight: "88vh", imgLeft: "5vw",  imgTop: "6vh",  textSide: "overlay-left" },
  { imgWidth: "50vw", imgHeight: "68vh", imgLeft: "26vw", imgTop: "16vh", textSide: "overlay-bottom" },
  { imgWidth: "64vw", imgHeight: "76vh", imgLeft: "10vw", imgTop: "12vh", textSide: "right" },
  { imgWidth: "46vw", imgHeight: "64vh", imgLeft: "28vw", imgTop: "18vh", textSide: "overlay-bottom" },
  { imgWidth: "70vw", imgHeight: "84vh", imgLeft: "5vw",  imgTop: "8vh",  textSide: "overlay-left" },
  { imgWidth: "55vw", imgHeight: "72vh", imgLeft: "14vw", imgTop: "14vh", textSide: "right" },
  { imgWidth: "80vw", imgHeight: "88vh", imgLeft: "5vw",  imgTop: "6vh",  textSide: "overlay-left" },
];
