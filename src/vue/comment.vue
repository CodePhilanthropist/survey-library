<template>
    <textarea
      v-if="!question.isReadOnlyRenderDiv() && !question.getMaxLength()"
      :readonly="question.isInputReadOnly"
      :disabled="question.renderedInputDisabled"
      :value="question.value"
      :id="question.inputId"
      :maxlength="question.getMaxLength()"
      :cols="question.cols"
      :rows="question.rows"
      :placeholder="question.renderedPlaceholder"
      :class="question.className"
      @change="change"
      @input="(e) => { question.onInput(e) }"
      @keydown="(e) => { question.onKeyDown(e) }"
      :aria-required="question.ariaRequired"
      :aria-label="question.ariaLabel"
      :aria-invalid="question.ariaInvalid"
      :aria-describedby="question.ariaDescribedBy"
      v-bind:style="{ resize: question.resizeStyle }"
    ></textarea>
    <div v-else-if="!question.isReadOnlyRenderDiv() && question.getMaxLength()">
      <textarea
        :readonly="question.isInputReadOnly"
        :disabled="question.renderedInputDisabled"
        :value="question.value"
        :id="question.inputId"
        :maxlength="question.getMaxLength()"
        :cols="question.cols"
        :rows="question.rows"
        :placeholder="question.renderedPlaceholder"
        :class="question.className"
        @change="change"
        @input="(e) => { question.onInput(e) }"
        @keydown="(e) => { question.onKeyDown(e) }"
        :aria-required="question.ariaRequired"
        :aria-label="question.ariaLabel"
        :aria-invalid="question.ariaInvalid"
        :aria-describedby="question.ariaDescribedBy"
        v-bind:style="{ resize: question.resizeStyle }"
      ></textarea>
      <sv-character-counter :counter="question.characterCounter" :remainingCharacterCounter="question.cssClasses.remainingCharacterCounter"></sv-character-counter>
    </div>
    <div v-else>{{ question.value }}</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { default as QuestionVue } from "./question";
import { QuestionCommentModel } from "survey-core";

@Component
export class Comment extends QuestionVue<QuestionCommentModel> {
  change(event: any) {
    this.question.value = event.target.value;
  }
}
Vue.component("survey-comment", Comment);

export default Comment;
</script>
