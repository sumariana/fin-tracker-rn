/**
 * Created by - on 13/06/2022
 * Copyright (c) 2022 - Made with love
 */

import { BlogListItem } from "../../src/models/workout/Blog";
import { VideosItem } from "../../src/models/workout/Videos";
import { WorkoutPeriod, WorkoutsItem } from "../../src/models/workout/Workout";
import { PickerItem } from "../model/PickerItem";

const _mockStatus = [
  {
    id: 1,
    status: "Pending",
  },
];

export { _mockStatus };


export const ProfileMenu = [
  {
    key: "edit_profile",
    icon: "person",
    icon_source: 'ionicons',
    label: "edit_profile"
  },
  {
    key: "change_password",
    icon: "lock-open",
    icon_source: 'ionicons',
    label: "change_password"
  }
]

export const SupportMenu = [
  {
    key: "review",
    icon: "star",
    icon_source: 'ionicons',
    label: "support_menu.review_this_app"
  },
  {
    key: "termcon",
    icon: "newspaper",
    icon_source: 'ionicons',
    label: "support_menu.termcon"
  },
  {
    key: "privacy",
    icon: "document-text",
    icon_source: 'ionicons',
    label: "support_menu.privacy"
  },
  {
    key: "about",
    icon: "information-circle",
    icon_source: 'ionicons',
    label: "support_menu.about"
  },
  {
    key: "contact",
    icon: "chatbubble-ellipses",
    icon_source: 'ionicons',
    label: "support_menu.contact_us"
  },
  {
    key: "language",
    icon: "book",
    icon_source: 'ionicons',
    label: "support_menu.language"
  }
]

export const AccountMenu = [
  {
    key: "delete_account",
    icon: "trash",
    icon_source: 'ionicons',
    label: "delete_account"
  },
  {
    key: "logout",
    icon: "exit",
    icon_source: 'ionicons',
    label: "logout.logout"
  }
]

export const LanguageData: PickerItem[] = [
  {
    id:'en',
    name: "English (ENG)"
  },
  {
    id:'it',
    name: "Italian (IT)"
  }
]

export const WorkoutDummy: WorkoutsItem[] = [
  {
    id: -1,
    thumbnail: "",
    name: "",
    duration: 9
  }
]

export const HomeVideosDummy: VideosItem[] = [
  {
    id: 3,
    thumbnail: "https://res.cloudinary.com/diyb3la39/video/upload/c_scale,w_200/e_loop:2/dl_200,vs_1.1s/claudia/2022-12-12_203906_file_example_MP4_480_1_5MG.gif",
    name: "sd",
    date: "2022-12-12T12:39:11.000000Z",
    is_favorite: false
  },
  {
    id: 1,
    thumbnail: "https://res.cloudinary.com/diyb3la39/video/upload/c_scale,w_200/e_loop:2/dl_200,vs_1.1s/claudia/2022-12-12_203906_file_example_MP4_480_1_5MG.gif",
    name: "sd",
    date: "2022-12-12T12:39:11.000000Z",
    is_favorite: false
  },
  {
    id: 32,
    thumbnail: "https://res.cloudinary.com/diyb3la39/video/upload/c_scale,w_200/e_loop:2/dl_200,vs_1.1s/claudia/2022-12-12_203906_file_example_MP4_480_1_5MG.gif",
    name: "sd",
    date: "2022-12-12T12:39:11.000000Z",
    is_favorite: false
  }
]

export const WorkoutSplitDummy: WorkoutPeriod[]= [
  {
    id: 2,
    period: "January 2024",
    title: "CFP January",
    thumbnail: "https://res.cloudinary.com/diyb3la39/image/upload/v1668340955/samples/ecommerce/accessories-bag.jpg",
    start_date: "2024-01-01",
    end_date: "2024-01-31",
    info: {
      title: "CFP January",
      description: ""
    },
    workouts: [
      {
        id: 1,
        thumbnail: "https://res.cloudinary.com/diyb3la39/image/upload/v1668340955/samples/ecommerce/accessories-bag.jpg",
        name: "Workout item en 1",
        duration: 9
      }
    ]
  },
  {
    id: 3,
    period: "December 2023",
    title: "CFP December",
    thumbnail: "https://res.cloudinary.com/diyb3la39/image/upload/v1668340955/samples/ecommerce/accessories-bag.jpg",
    start_date: "2023-12-01",
    end_date: "2023-12-31",
    info: {
      title: "CFP December",
      description: ""
    },
    workouts: [
      {
        id: 1,
        thumbnail: "https://res.cloudinary.com/diyb3la39/image/upload/v1668340955/samples/ecommerce/accessories-bag.jpg",
        name: "Workout item en 1",
        duration: 9
      }
    ]
  },
  {
    id: 4,
    period: "November 2023",
    title: "CFP November",
    thumbnail: "https://res.cloudinary.com/diyb3la39/image/upload/v1668340955/samples/ecommerce/accessories-bag.jpg",
    start_date: "2023-11-01",
    end_date: "2023-11-31",
    info: {
      title: "CFP November",
      description: ""
    },
    workouts: [
      {
        id: 1,
        thumbnail: "https://res.cloudinary.com/diyb3la39/image/upload/v1668340955/samples/ecommerce/accessories-bag.jpg",
        name: "Workout item en 1",
        duration: 9
      }
    ]
  },
  {
    id: 5,
    period: "October 2023",
    title: "CFP October",
    thumbnail: "https://res.cloudinary.com/diyb3la39/image/upload/v1668340955/samples/ecommerce/accessories-bag.jpg",
    start_date: "2023-10-01",
    end_date: "2023-10-31",
    info: {
      title: "CFP October",
      description: ""
    },
    workouts: [
      {
        id: 1,
        thumbnail: "https://res.cloudinary.com/diyb3la39/image/upload/v1668340955/samples/ecommerce/accessories-bag.jpg",
        name: "Workout item en 1",
        duration: 9
      }
    ]
  }
]

export const HomeBlogDummy: BlogListItem[] = [
  {
    id: 1,
    thumbnail: "https://res.cloudinary.com/diyb3la39/image/upload/v1668340972/cld-sample-5.jpg",
    date: "2022-12-09T09:44:25.000000Z",
    title: "Test Blog en 1",
    tag: "Blog en 1 tag"
  },
  {
    id: 2,
    thumbnail: "https://res.cloudinary.com/diyb3la39/image/upload/v1668340972/cld-sample-5.jpg",
    date: "2022-12-09T09:44:25.000000Z",
    title: "Test Blog en 1",
    tag: "Blog en 1 tag"
  },
]