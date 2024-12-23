FROM postgres

RUN useradd -ms /bin/bash test

RUN chown -R test:test /var/run/postgresql && \
 chmod -R 701 /var/run/postgresql

USER test

EXPOSE 5432

HEALTHCHECK CMD pg_isready -d taskdb -U test || exit 1  

CMD ["postgres"]