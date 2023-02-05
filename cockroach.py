#V8I84KisloLNSswzgIQeng
import os
import psycopg2
conn = psycopg2.connect("postgresql://alex:3XPeRTpvCaXFNVKXOCNSTQ@starry-cyclops-4874.6wr.cockroachlabs.cloud:26257/anime?sslmode=verify-full")

# Create a new table in the database
def create_table(conn):
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS mal (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );
    """)
    conn.commit()
    print("Table created successfully")

# Insert a new user into the database
def insert_user(conn, name):
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO mal (name)
        VALUES (%s);
    """, (name))
    conn.commit()
    print("User inserted successfully")

# Select all users from the database
def select_all_users(conn):
    cur = conn.cursor()
    cur.execute("""
        SELECT * FROM mal;
    """)
    users = cur.fetchall()
    for user in users:
        print(user)

# Update a user in the database
def update_user(conn, id, name):
    cur = conn.cursor()
    cur.execute("""
        UPDATE users
        SET name = %s = %s
        WHERE id = %s;
    """, (name, id))
    conn.commit()
    print("User updated successfully")

# Delete a user from the database
def delete_user(conn, id):
    cur = conn.cursor()
    cur.execute("""
        DELETE FROM users
        WHERE id = %s;
    """, (id,))
    conn.commit()
    print("User deleted successfully")

# Create the table
create_table(conn)

# Insert a new user
# insert_user(conn, "1")

# Select all users
select_all_users(conn)
# Update a user
# update_user(conn, 1, "Jane Doe", "janedoe@example.com")
conn.close()
