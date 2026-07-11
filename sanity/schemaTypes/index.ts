import { type SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { product } from "./product";
import { advantage } from "./advantage";
import { testimonial } from "./testimonial";
import { faq } from "./faq";
import { article } from "./article";
import { articleCategory } from "./articleCategory";
import { topicBrief } from "./topicBrief";
import { galleryImage } from "./galleryImage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    product,
    advantage,
    testimonial,
    faq,
    article,
    articleCategory,
    topicBrief,
    galleryImage,
  ],
};
