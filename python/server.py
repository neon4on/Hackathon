from flask import Flask, jsonify
import subprocess
import os

app = Flask(__name__)

@app.route('/start-distribution', methods=['POST'])
def start_distribution():
    try:
        script_path = os.path.abspath(os.path.join('..', 'backend', 'ml', 'main.py'))
        python_executable = os.path.abspath(os.path.join('..', 'backend', 'ml', 'venv', 'Scripts', 'python.exe'))
        
        print(f"Running script: {script_path} with {python_executable}")
        
        result = subprocess.run(
            [python_executable, script_path],
            capture_output=True,
            text=True,
            cwd=os.path.dirname(script_path)
        )
        if result.returncode == 0:
            print(f"Script output: {result.stdout}")
            return jsonify({"status": "success", "output": result.stdout}), 200
        else:
            print(f"Script returned non-zero exit code. Error: {result.stderr}")
            return jsonify({"status": "error", "error": result.stderr}), 500
    except Exception as e:
        print(f"Exception: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
