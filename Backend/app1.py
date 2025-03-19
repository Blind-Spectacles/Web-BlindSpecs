import requests
import cv2

SERVER_URL = "http://192.168.207.57:5000/process_frame"

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    _, img_encoded = cv2.imencode('.jpg', frame)
    response = requests.post(SERVER_URL, files={"file": img_encoded.tobytes()})

    if response.status_code == 200:
        try:
            print(response.json())  # Output detection results
        except requests.exceptions.JSONDecodeError:
            print("Error: Server did not return valid JSON.")
            print("Response text:", response.text)
    else:
        print(f"Error: Server responded with status code {response.status_code}")

cap.release()