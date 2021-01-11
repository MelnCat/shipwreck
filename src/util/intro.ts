import { GameHandler, setImage, typeMsg } from "./GameHandler";
import { GameState } from "./GameState";

const finish = () => {
	GameHandler.emit("setInfo", { left: "Enter instructions in the textbox to advance" });
	GameState.introDone = true;
	GameState.setArea("beach");
};
export const run = async () => {
	if (process.env.NODE_ENV === "development") return finish();
	setImage(
		`\
 -----I-I-I-I-I-I-----
|   {bold}   JUNE 2021  {/bold}    |
|   {62-fg}    [][][][][]    |
|   {62-fg}[][][][][][][]    |
|   {62-fg}[][][][][][][]    |
|   {62-fg}[][][][][][][]    |
|   {62-fg}[][][]{yellow-fg}[]          |
|   {53-fg}==============    |
 ---------------------`
			.replace(/-{2,}/g, x => `{white-fg}${x}`)
			.replace(/-I/g, x => `{white-fg}${x}`)
			.replace(/I+/g, x => `{244-fg}${x}`)
			.replace(/\|+/g, x => `{white-fg}${x}`)
	);
	await typeMsg(`The current date is {bold}June 30th, 2021{/bold}.\n\nAfter a long exhausting school year, \
you're eager to stop worrying about schoolwork, and begin your well-deserved 2-month-long break.`);
	setImage(
		`\
       ,     ,      oo  ,
 ,   ~  o       ~     ,
         ,  ~      ,   ~   ,
   ,       ,  ,      ,   ~
    ~      _____.....__   ,
     ___.-'' - " _  .  ''---
---'' -  . ^ '  "  - ^ " .   \
`
			.replace(/[-'_."^]/g, x => `{green-fg}${x}`)
			.replace(/[o]/g, x => `{248-fg}${x}`)
			.replace(/[,]/g, x => `{yellow-fg}${x}`)
			.replace(/[~]/g, x => `{61-fg}${x}`)
	);
	await typeMsg(
		"You walk outside, and view your surroundings. The weather seems to be great today. \
The sky is enriched with a deep blue hue, and there are minimal clouds present.\n\n\
You decide that it is a great day to visit some new places."
	);
	await typeMsg("Perhaps it could be fun to travel across the coast.");
	setImage(
		`\
 ----------------
| #  {bold}BOARDING{/}    |
|      {bold}PASS{/}      |
|   #        #   |
|      9:35      |
|   June  30th   |
|  #   2021      |
|       #     #  |
|  100120129384  |
|  {173-fg}SEE REVERSE{/} # |
 ----------------\
`.replace(/#/g, "{237-fg}#{/}")
	);
	await typeMsg(`You head outside, and head to the nearest terminal to purchase a fare for boarding.\n
You decide to purchase a fare for a two-way trip, and began to wait for the departure.`);
	setImage(
		`\
   ~~     ~       ~
  ~~   ~     ~~ ~    ____
---------------  ~~  \\  _
# # | # #   |  |      \\ \\
#| #  # | |# # |   "~. \\
=============== . ~.; @ \\
    ~~    ~   ~   ~,.@"@@
~~      ~   ~~   ~    ~
`
			.replace(/[|\-=]/g, x => `{143-fg}${x}`)
			.replace(/[\\_]/g, x => `{252-fg}${x}`)
			.replace(/#/g, "{58-fg}#")
			.replace(/~/g, "{61-fg}~")
			.replace(/[@.,;"]/g, x => `{153-fg}${x}`)
	);
	await typeMsg(`After a few hours, the departure begins, and you walk aboard the ferry.
You've heard that this ferry was a new experimental design that has gotten approval recently. However, it doesn't look too interesting.`);
	setImage();
	await typeMsg("You quickly find a vacant seat, and you fall asleep to the gentle rocking of the vessel.");
	await typeMsg("...");
	await typeMsg(`Two hours later, you wake up to a broadcasted announcement. However, you were not aware enough to make out the words.
You look around, and see everyone frantically panicking while rushing to the exits.`);
	await typeMsg("The vessel violently sways to one side, knocking you over. You pass out from the impact.");
	await typeMsg("......");
	await typeMsg(`You wake up lying down in an unfamiliar place. Your mouth is filled with the foul taste of sand. Your entire body is covered with several bruises.
You see the ferry nearby, but it has seemed to been broken into pieces.`);
	await typeMsg(
		`You've figured that something must have gone terribly wrong. No one else is nearby. You seem to be on your own.
You check your pockets for anything useful, but everything seems to have fallen out except for a {bold}Package of Staples{/}.`
	);
	finish();
};
