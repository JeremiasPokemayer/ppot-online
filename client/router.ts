import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/initpre", component: "initpre-page" },
  { path: "/init", component: "init-page" },
  { path: "/initplayer2", component: "init-page-p2" },
  { path: "/newGame", component: "newgame-page" },
  { path: "/joinRoom", component: "joinroom-page" },
  { path: "/roomComplete", component: "roomcomplete-page" },
  { path: "/chat", component: "chat-page" },
  { path: "/initWFO", component: "init-wfo" },
  { path: "/gamep1", component: "gameroom-page" },
  { path: "/gamep2", component: "gameroomp2-page" },
  { path: "/showmoves", component: "showmoves-page" },
  { path: "/result", component: "result-page" },
  { path: "/resultP2", component: "result-page-p2" },
]);
