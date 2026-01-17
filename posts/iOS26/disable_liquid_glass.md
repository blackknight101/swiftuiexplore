---
title: "How to Disable Liquid Glass for iOS 26"
date: 2026-01-17
thumbnail: "/assets/thumbnails/some-topic.jpg"
short_description: "Disable Liquid Glass for iOS26"
category: ["IOS26", "Liquid Glass"]
tags: ["iOS26", "Liquid Glass"]
---

# How to Disable Liquid Glass for iOS 26

If you've updated to Xcode 26 and found that the new "Liquid Glass" rendering has broken your app's UI on iOS 26, you can temporarily opt out by using a compatibility flag.

### Quick Steps:

1.  **Open your project** in Xcode 26.
2.  Locate your app's **Info.plist** file.
3.  Add a new key: `UIDesignRequiresCompatibility`.
4.  Set its value to **YES** (Boolean).

### Why use this?
Setting this flag tells the system to render your app using the legacy design style rather than the new Liquid Glass engine.

### Important Note:
This is only a **temporary workaround**. Apple is expected to support this flag until iOS 27. It is highly recommended to start updating your UI to support Liquid Glass as soon as possible before this fallback is removed.