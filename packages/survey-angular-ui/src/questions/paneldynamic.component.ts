import { Component, OnInit } from "@angular/core";
import { QuestionAngular } from "../question";
import { PanelModel, QuestionPanelDynamicModel, SurveyModel } from "survey-core";
import { AngularComponentFactory } from "../component-factory";

@Component({
  selector: "sv-ng-paneldynamic-question",
  templateUrl: "./paneldynamic.component.html"
})
export class PanelDynamicQuestionComponent extends QuestionAngular<QuestionPanelDynamicModel | any> implements OnInit {
  get renderedPanels(): PanelModel[] {
    if (this.model.isRenderModeList) return this.model.panels;
    const panels = [];
    if (this.model.currentPanel) {
      panels.push(this.model.currentPanel);
    }
    return panels;
  }
  protected override onModelChanged(): void {
    super.onModelChanged();
    this.model.panelCountChangedCallback = () => {
      this.detectChanges();
    };
    this.model.currentIndexChangedCallback = () => {
      this.detectChanges();
    };
    this.model.renderModeChangedCallback = () => {
      this.detectChanges();
    };
  }
  get progressCssClass() {
    return this.model.isProgressTopShowing
      ? this.model.cssClasses.progressTop
      : this.model.cssClasses.progressBottom;
  }
  override ngOnDestroy(): void {
    this.model.panelCountChangedCallback = () => {};
    this.model.currentIndexChangedCallback = () => {};
    this.model.renderModeChangedCallback = () => {};
    super.ngOnDestroy();
  }
  public getPanelComponentName(panel: PanelModel): string {
    const survey = this.surveyModel as SurveyModel;
    if(!!survey) {
      const name = survey.getElementWrapperComponentName(panel);
      if(!!name) {
        return name;
      }
    }
    return "panel";
  }
  public getPanelComponentData(panel: PanelModel): any {
    const survey = this.surveyModel as SurveyModel;
    let data: any;
    if(!!survey) {
      data = survey.getElementWrapperComponentData(panel);
    }
    return {
      componentName: "panel",
      componentData: {
        model: panel,
        data: data
      }
    };
  }
}

AngularComponentFactory.Instance.registerComponent("paneldynamic-question", PanelDynamicQuestionComponent);