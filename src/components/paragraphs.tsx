import React from "react";
import { FigureParagraph } from "./paragraphs/figure";
import { ButtonsParagraph } from  "./paragraphs/buttons";
import { TabsImageTilesParagraph }  from "./paragraphs/tabsimagetiles"
import { TitleArticleTypeTilesParagraph } from "./paragraphs/titlearticletypetiles"
import { EmbedmapParagraph} from  "./paragraphs/embedmap"
import { AccordionsParagraph } from "./paragraphs/accordions"
import { TitleImageTilesParagraph } from "./paragraphs/titleimagetiles"
import { EmbedVideoParagraph } from "./paragraphs/embedvideo"

const components = {
    paragraph__figure: FigureParagraph,
    paragraph__buttons: ButtonsParagraph,
    paragraph__embed_video: EmbedVideoParagraph,
    paragraph__title_tab_image_tiles: TabsImageTilesParagraph,
    paragraph__title_article_type_tiles: TitleArticleTypeTilesParagraph,
    paragraph__embed_map: EmbedmapParagraph,
    paragraph__accordions_: AccordionsParagraph,
    paragraph__title_image_tiles: TitleImageTilesParagraph
};

export const getParagraph = node => {
    if (components.hasOwnProperty(node.type)) {
        const ParagraphComponent = components[node.type];
        return <ParagraphComponent key={node.type.id} node={node} />;
    }
    return <p key={node.type.id}>Unknown type {node.__typename}</p> ;
};
