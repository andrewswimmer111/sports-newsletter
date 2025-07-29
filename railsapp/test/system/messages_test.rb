require "application_system_test_case"

class MessagesTest < ApplicationSystemTestCase
  setup do
    @message = messages(:one)
  end

  test "visiting the index" do
    visit messages_url
    assert_selector "h1", text: "Messages"
  end

  test "should create message" do
    visit messages_url
    click_on "New message"

    fill_in "Chat order", with: @message.chat_order
    fill_in "Message", with: @message.message
    fill_in "Timestamp", with: @message.timestamp
    fill_in "Uid receiver", with: @message.uid_receiver_id
    fill_in "Uid sender", with: @message.uid_sender_id
    click_on "Create Message"

    assert_text "Message was successfully created"
    click_on "Back"
  end

  test "should update Message" do
    visit message_url(@message)
    click_on "Edit this message", match: :first

    fill_in "Chat order", with: @message.chat_order
    fill_in "Message", with: @message.message
    fill_in "Timestamp", with: @message.timestamp
    fill_in "Uid receiver", with: @message.uid_receiver_id
    fill_in "Uid sender", with: @message.uid_sender_id
    click_on "Update Message"

    assert_text "Message was successfully updated"
    click_on "Back"
  end

  test "should destroy Message" do
    visit message_url(@message)
    click_on "Destroy this message", match: :first

    assert_text "Message was successfully destroyed"
  end
end
