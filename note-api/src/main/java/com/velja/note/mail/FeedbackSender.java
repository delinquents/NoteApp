package com.velja.note.mail;

public interface FeedbackSender {
    void sendFeedback(String from, String name, String feedback);
}
