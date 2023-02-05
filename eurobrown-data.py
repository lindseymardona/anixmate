import os
import psycopg2
import requests
import csv

conn = psycopg2.connect("postgresql://eurobrown:4uM6g0VSCklQQuOBkSIthg@busy-flyer-4896.6wr.cockroachlabs.cloud:26257/pain?sslmode=verify-full")

# Create a new table in the database
def create_table(conn):
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS removed (
            id INT64 PRIMARY KEY,
            name STRING NOT NULL
        );
    """)
    conn.commit()
    print("Table created successfully")

def create_table1(conn):
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS completed (
            id INT64 PRIMARY KEY,
            name STRING NOT NULL
        );
    """)
    conn.commit()
    print("Table created successfully")

def create_table2(conn):
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS recommendation (
            id INT64 PRIMARY KEY,
            name STRING NOT NULL,
            med_img_url STRING NOT NULL,
            lg_img_url STRING NOT NULL
        );
    """)
    conn.commit()
    print("Table created successfully")

def import_into():
    cur = conn.cursor()
    with open("/Users/eurobrown/Downloads/simon.csv", "r") as f:
        lines = f.readlines()
    
    lines = [line.strip().split(",") for line in lines]
    for line in lines:
        id = line[0]
        title = line[1]

        # print(f"id: {id}, title: {title}")
        cur.execute("INSERT INTO completed VALUES (%s, %s)", (id, title))
    conn.commit()

    print("Data imported sucessfully")

def import_into1():
    cur = conn.cursor()
    with open("/Users/eurobrown/Downloads/recommendations.csv", "r") as f:
        lines = f.readlines()
    
    lines = [line.strip().split(",") for line in lines]
    for line in lines:
        id = line[0]
        title = line[1]
        med_img_url = line[2]
        lg_img_url = line[3]
        # print(f"id: {id}, title: {title}")
        cur.execute("INSERT INTO recommendation VALUES (%s, %s, %s, %s)", (id, title, med_img_url, lg_img_url))
    conn.commit()

    print("Data imported sucessfully")


def check_tables(conn):
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM actual")
        rows = cur.fetchall()
        for row in rows:
            print([str(cell) for cell in row])

def read_table(conn):
    with conn.cursor() as cur:
        cur.execute(f"SELECT id, name FROM recommendation")
        rows = cur.fetchall()
        for row in rows:
            print([str(cell) for cell in row])

# Insert a new completed anime into the database
def insert_user(conn, name, email):
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO users (name, email)
        VALUES (%s, %s);
    """, (name, email))
    conn.commit()
    print("User inserted successfully")

# Select all * from the database
def select_all_users(conn):
    cur = conn.cursor()
    cur.execute("""
        SELECT * FROM completed;
    """)
    users = cur.fetchall()
    for user in users:
        print(user)

# Update a user in the database
def update_user(conn, id, name, email):
    cur = conn.cursor()
    cur.execute("""
        UPDATE users
        SET name = %s, email = %s
        WHERE id = %s;
    """, (name, email, id))
    conn.commit()
    print("User updated successfully")

# Delete an entry from the database

def delete_complete(conn, id):
    cur = conn.cursor()
    cur.execute("""
        DELETE FROM completed
        WHERE id = %s;
    """, (id,))
    conn.commit()
    print("anime_id deleted successfully")


def create_actual(conn):
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE actual AS(
            SELECT recommendation.id, recommendation.name
            FROM recommendation
            INNER JOIN completed
            ON recommendation.id = completed.id
        );
    """)
    conn.commit()
    print("Table created successfully")

def create_actual1(conn):
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE actual AS(
            SELECT *
            FROM completed
            EXCEPT
            SELECT id, name
            FROM recommendation
        );
    """)
    conn.commit()
    print("Table created successfully")

# Delete a Table
def drop(conn):
    cur = conn.cursor()
    cur.execute(""" DROP TABLE actual
    """)
    conn.commit()
    print("Table was deleted")


# Create the table
#create_table(conn)

# Update a user
#update_user(conn, 1, "Jane Doe", "janedoe@example.com")

drop(conn)
create_actual(conn)
check_tables(conn)

#read_table(conn)

#create_table(conn)
#create_table2(conn)
#create_actual(conn)

#import_into()
#import_into1()

# Close the database connection
conn.close()
