module.exports = {
  id: "blackout_yaba",

  name: "Blackout in Yaba",

  location: "Yaba",

  danger: "EXTREME",

  tagline: "When the lights die, so does trust.",

  // ======================
  // INTRO SEQUENCE
  // ======================

  intro: [
    "⚡ BLACKOUT IN YABA",
    "Power grid failure confirmed across all districts.",
    "20 survivors. Total darkness. No witnesses."
  ],

  // ======================
  // EVENT PACING
  // ======================

  roundConfig: {
    min: 5,
    max: 7,
    survivalChance: 0.15,
    funnyChance: 0.22
  },

  // ======================
  // ATMOSPHERE
  // ======================

  atmosphere: [
    "The generators across Yaba died one by one.",
    "Sabo market is dark. Herbert Macaulay is darker.",
    "The tech bros ran first. Everyone else stayed.",
    "NEPA took the light. The darkness took the rest.",
    "Even the screen glow became dangerous in Yaba tonight.",
    "A single phone torch flickered near Tejuosho. Then vanished.",
    "The blackout spread deeper into Yaba district.",
    "Every sound felt closer in the darkness.",
    "The silence around UNILAG became unsettling.",
    "People stopped speaking once the generators failed."
  ],

  // ======================
  // NARRATION
  // ======================

  narration: [
    "The blackout reached Yaba at exactly the wrong moment.",
    "Herbert Macaulay Road went silent after the third outage.",
    "Nobody could see anything near Tejuosho. That was the point.",
    "A phone torch turned on near Sabo. It became a target.",
    "The students from UNILAG heard the sounds and stayed inside.",
    "Something moved through the darkness near Yaba bus stop.",
    "The sound of footsteps echoed through empty streets.",
    "One generator tried to restart. It failed instantly.",
    "Nobody trusted the shadows in Yaba tonight.",
    "The darkness in Sabo started feeling alive."
  ],

  // ======================
  // ELIMINATIONS
  // ======================

  eliminations: [
    "{victim} turned on their phone torch in the dark. {killer} saw them first.",
    "{killer} used the blackout in Yaba to do what daylight would never allow.",
    "{victim} trusted the wrong shadow near Tejuosho. The shadow had a name: {killer}.",
    "In the darkness near Herbert Macaulay, {killer} settled a debt with {victim}.",
    "{victim} tried to navigate Yaba blind. {killer} knew every corner.",
    "{killer} waited for the generator to die. Then moved on {victim}.",
    "The sound of {victim} moving gave them away. {killer} moved in silence.",
    "{victim} ran toward the light on Sabo. {killer} was already standing in it.",
    "{killer} used {tool} to finish {victim} during the blackout.",
    "{victim} followed the wrong footsteps near UNILAG.",
    "A shadow moved behind {victim}. That shadow was {killer}.",
    "{killer} baited {victim} with fake generator noise.",
    "{victim} hid in darkness. Unfortunately, so did {killer}.",
    "{victim} trusted a voice in the dark. Dangerous decision.",
    "{killer} knew Yaba better when the lights were gone."
  ],

  // ======================
  // FUNNY DEATHS
  // ======================

  funny: [
    "{victim} tripped over a power cable in the Yaba blackout. The cable won.",
    "{victim} was eliminated while trying to hotspot in a no-signal zone.",
    "{victim} called out to ask if anyone was there. Someone answered.",
    "{victim} thought their power bank would save them. Wrong kind of power.",
    "{victim} posted their location by accident. One person saw it. Bad person.",
    "{victim} increased screen brightness to maximum. Historic error.",
    "{victim} tried to charge a dead phone during a citywide blackout.",
    "{victim} trusted free WiFi in the middle of chaos.",
    "{victim} thought the noise was a generator. It was not.",
    "{victim} stopped running to check notifications."
  ],

  // ======================
  // SURVIVAL EVENTS
  // ======================

  survival: [
    "{victim} stayed completely still near Tejuosho until the round passed.",
    "{victim} used the blackout as cover and slipped through Herbert Macaulay unseen.",
    "{victim} found a charged phone and used the light to navigate to safety.",
    "{victim} knew a generator compound in Sabo. Old Yaba connections saved them.",
    "{victim} pretended to be unconscious near Tejuosho market. Convincing performance.",
    "{victim} survived by blending into the darkness without making a sound.",
    "{victim} found temporary safety inside an abandoned hostel.",
    "{victim} escaped through a narrow alley only Yaba residents knew.",
    "{victim} used a dead traffic zone as hiding cover.",
    "{victim} survived another round by staying invisible in the blackout."
  ]
};
