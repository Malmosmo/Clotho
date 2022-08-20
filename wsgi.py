#!/usr/bin/python3

import logging
import sys
from pathlib import Path

from main import app as application

BASE_DIR = Path(__file__).resolve().parent

logging.basicConfig(level=logging.DEBUG, filename=BASE_DIR / "logs" / "server.log", format="%(asctime)s %(message)s")
sys.path.insert(0, str(BASE_DIR))
