# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField, HiddenField, TextAreaField


class QuestionAndAnswerForm(FlaskForm):
    question_id = HiddenField(
        render_kw={'readonly': True}
    )

    question_input = TextAreaField(
        render_kw={'placeholder': "", "data-counter-label": ""}
    )

    question_edit_input = TextAreaField(
        render_kw={'placeholder': "", "data-counter-label": ""}
    )

    answer_input = TextAreaField(
        render_kw={'placeholder': "", "data-counter-label": ""}
    )


class QuestionEditForm(FlaskForm):
    question_edit_input = TextAreaField(
        render_kw={'placeholder': "", "data-counter-label": ""}
    )

    question_edit_id = HiddenField(
        render_kw={'readonly': True}
    )


class AnswerEditForm(FlaskForm):
    answer_edit_input = TextAreaField(
        render_kw={'placeholder': "", "data-counter-label": ""}
    )

    answer_edit_id = HiddenField(
        render_kw={'readonly': True}
    )


class TalkingForm(FlaskForm):
    talking_input = TextAreaField(
        render_kw={'placeholder': "", "data-counter-label": ""}
    )


class TalkingEditForm(FlaskForm):
    talking_edit_input = TextAreaField(
        render_kw={'placeholder': "", "data-counter-label": ""}
    )

    talking_edit_id = HiddenField(
        render_kw={'readonly': True}
    )


class TalkingAnswerEditForm(FlaskForm):
    talking_answer_edit_input = TextAreaField(
        render_kw={'placeholder': "", "data-counter-label": ""}
    )

    talking_answer_edit_id = HiddenField(
        render_kw={'readonly': True}
    )
