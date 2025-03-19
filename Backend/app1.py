import requests
import cv2
import numpy as np

SERVER_URL = "http://192.168.207.57:5000/process_frame"

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Encode the frame as JPEG
    _, img_encoded = cv2.imencode('.jpg', frame)
    response = requests.post(SERVER_URL, files={"file": img_encoded.tobytes()})

    if response.status_code == 200:
        try:
            data = response.json()  # Get the JSON response
            print(data)  # Debugging - see what the server returns
            
            # Check if 'boxes' are present in the response
            if "boxes" in data:
                for box in data["boxes"]:
                    x, y, w, h = box  # Assuming the server returns [x, y, width, height]
                    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)  # Draw box
            
            # Display the frame
            cv2.imshow("Object Detection", frame)

        except requests.exceptions.JSONDecodeError:
            print("Error: Server did not return valid JSON.")
            print("Response text:", response.text)

    else:
        print(f"Error: Server responded with status code {response.status_code}")

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
