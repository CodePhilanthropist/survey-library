import * as ko from "knockout";
import { Survey, PopupSurvey } from "./knockout-ui-model";
export { Model } from "./knockout-ui-model";
export * from "./core-wo-model";

// themes settings
export * from "./plugins";

// localization
import "./chunks/localization";

const innerKo: any = ko;
export { innerKo as ko };

import { registerTemplateEngine } from "../knockout/kosurvey";
import { SurveyModel } from "../survey";

export class ReactSurveyModel extends Survey {
  constructor(
    jsonObj: any = null,
    renderedElement: any = null,
    css: any = null
  ) {
    super(jsonObj, renderedElement);
    if(!!css) this.css = css;
    // eslint-disable-next-line no-console
    console.warn("ReactSurveyModel is depricated in this context. Use Survey.Model instead.");
  }
}

export class SurveyNG {
  public static render(elementId: string | Element, props: any): void {
    var element: Element =
      typeof elementId === "string"
        ? document.getElementById(elementId)
        : elementId;
    var model: SurveyModel = props.model;
    model.updateSurvey(props);
    model.render(element);
  }
}

export class PopupSurveyNG {
  public static render(elementId: string | Element, props: any): void {
    var model: SurveyModel = props.model;
    model.updateSurvey(props);
    var survey = new PopupSurvey(null, model);
    if (props.expanded !== undefined) {
      survey.isExpanded = props.expanded;
    }
    if (props.isExpanded !== undefined) {
      survey.isExpanded = props.isExpanded;
    }
    survey.show();
  }
}

export class SurveyWindowNG extends PopupSurveyNG {
}

SurveyModel.platform = "angular";
registerTemplateEngine(ko, SurveyModel.platform);
